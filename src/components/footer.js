export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Cesar Enrique Manzano Velasco</p>
          <p className="mt-2">
            <a href="mailto:ceman217@gmail.com" className="hover:text-gray-300">ceman217@gmail.com</a> | 
            <a href="https://www.linkedin.com/in/EnriqueManzano217" target="_blank" rel="noopener noreferrer" className="ml-2 hover:text-gray-300">LinkedIn</a>
          </p>
        </div>
      </footer>
    )
  }