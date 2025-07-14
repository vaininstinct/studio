'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bot, Loader2, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { Lead } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { runPersonalizeMessage } from '@/app/actions/personalize';

const FormSchema = z.object({
  messageTemplate: z.string().min(10, {
    message: 'Template must be at least 10 characters.',
  }),
});

type FormValues = z.infer<typeof FormSchema>;

const defaultTemplate = `Hey {name}! I came across your profile and love your content. I think we could create something amazing together. Are you open to a chat?`;

interface PersonalizeMessageDialogProps {
  lead: Lead;
}

export function PersonalizeMessageDialog({ lead }: PersonalizeMessageDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [personalizedMessage, setPersonalizedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      messageTemplate: defaultTemplate.replace('{name}', lead.name.split(' ')[0]),
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsGenerating(true);
    setPersonalizedMessage('');
    try {
      const result = await runPersonalizeMessage({
        leadProfileData: `Name: ${lead.name}, Bio: ${lead.bio}, Recent Post context: User is interested in photography and travel.`,
        messageTemplate: data.messageTemplate,
      });
      if (result && 'personalizedMessage' in result) {
        setPersonalizedMessage(result.personalizedMessage);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to generate message. Please try again.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An unexpected error occurred.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSend = async () => {
    setIsSending(true);
    // Simulate sending message
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSending(false);
    setIsOpen(false);
    toast({
      title: 'Message Sent!',
      description: `Your message to @${lead.username} has been sent.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Send className="mr-2 h-4 w-4" />
          Message
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Message @{lead.username}</DialogTitle>
          <DialogDescription>
            Personalize your message using AI to increase your response rate.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="messageTemplate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message Template</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your message template"
                      rows={4}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isGenerating}>
              {isGenerating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Bot className="mr-2 h-4 w-4" />
              )}
              Generate with AI
            </Button>
          </form>
        </Form>
        {personalizedMessage && (
          <div className="space-y-2 pt-4">
            <FormLabel>Personalized Message</FormLabel>
            <Textarea readOnly value={personalizedMessage} rows={5} className="resize-none" />
          </div>
        )}
        <DialogFooter>
          <Button
            type="button"
            onClick={handleSend}
            disabled={!personalizedMessage || isSending}
          >
            {isSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
