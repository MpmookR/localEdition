export function Footer() {
  return (
    <footer className="px-8 py-8 sm:px-24 border-t border-gold/30 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-muted">
        © {new Date().getFullYear()} Local Edition · All rights reserved
      </p>
    </footer>
  );
}
