import '@styles/globals.css';
import Nav from '@components/Nav';


export const metadata = {
  title: "BlogChain",
  description: 'Read & Write Blogs'
}

const RootLayout = ({ children }) => {
  return (
    <html lang='tr'>
      <body style={{ background: "#F4E8D8" }}>
              <div style={{background: "#F4E8D8"}}>
              </div>
              <main className="app">
                  <Nav />
                  {children}
              </main> 
      </body>
    </html>
  )
}

export default RootLayout