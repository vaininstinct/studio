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
import { Input } from '@/components/ui/input';
import { runGenerateOpener } from '@/app/actions/outreach';
import { Label } from '@/components/ui/label';

const FormSchema = z.object({
  goal: z.string().min(5, {
    message: 'Goal must be at least 5 characters.',
  }),
  customPrompt: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

const defaultGoal = 'Book a 15-minute discovery call';

interface PersonalizeMessageDialogProps {
  lead: Lead;
}

export function PersonalizeMessageDialog({ lead }: PersonalizeMessageDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      goal: defaultGoal,
      customPrompt: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsGenerating(true);
    setGeneratedMessage('');
    try {
      const result = await runGenerateOpener({
        leadProfileData: `Name: ${lead.name}, Bio: ${lead.bio}, Recent Post context: User is interested in photography and travel.`,
        goal: data.goal,
        customPrompt: data.customPrompt,
      });
      if (result && 'openingMessage' in result) {
        setGeneratedMessage(result.openingMessage);
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
      description: `Your automated conversation with @${lead.username} has started.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Send className="mr-2 h-4 w-4" />
          Start Conversation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Start AI Conversation with @{lead.username}</DialogTitle>
          <DialogDescription>
            Define the goal and provide custom instructions for the AI to generate a personalized opening message.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conversation Goal</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Book a call, redirect to website"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="customPrompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Instructions (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Do not mention pricing. Keep the message under 50 words."
                      rows={3}
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
              Generate Opening Message
            </Button>
          </form>
        </Form>
        {generatedMessage && (
          <div className="space-y-2 pt-4">
            <Label>Generated Message</Label>
            <Textarea readOnly value={generatedMessage} rows={5} className="resize-none bg-secondary/50" />
          </div>
        )}
        <DialogFooter>
          <Button
            type="button"
            onClick={handleSend}
            disabled={!generatedMessage || isSending}
          >
            {isSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send and Start Automation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
