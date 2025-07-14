import { AccountConnection } from '@/components/settings/account-connection';
import { ProxySettings } from '@/components/settings/proxy-settings';

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col bg-background sm:pl-20">
      <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-card px-6">
        <h1 className="text-xl font-semibold">Settings</h1>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-2xl space-y-6">
          <AccountConnection />
          <ProxySettings />
        </div>
      </main>
    </div>
  );
}
