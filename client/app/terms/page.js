export default function TermsPage() {
  return (
    <main className="px-6 py-12 max-w-4xl mx-auto text-black dark:text-white">
      <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
      <p className="text-lg leading-relaxed mb-4">
        By using InstaGenius, you agree to these terms:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-lg">
        <li>Use the service responsibly.</li>
        <li>Do not misuse or exploit the tool for harmful purposes.</li>
        <li>We may update or modify the site at any time.</li>
        <li>We are not responsible for misuse or damages caused by generated content.</li>
      </ul>
    </main>
  );
}