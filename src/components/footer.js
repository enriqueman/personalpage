export default function Footer() {
  return (
    <footer className="bg-background border-t border-border text-foreground p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Cesar Enrique Manzano Velasco</p>
        <p className="mt-2">
          <a href="mailto:ceman217@gmail.com" className="text-primary hover:text-primary/80 transition-colors">
            ceman217@gmail.com
          </a>{" "}
          |
          <a
            href="https://www.linkedin.com/in/EnriqueManzano217"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-primary hover:text-primary/80 transition-colors"
          >
            LinkedIn
          </a>
        </p>
      </div>
    </footer>
  )
}
