
import './App.css'
import ItemPage from './component/ItemPage'
import New from './component/New'
import { NewsProvider } from './component/NewsContext'
import NewsList from './component/NewsList'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
function App() {
 

  return (
    <>
     <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
     <NewsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<NewsList />} />
          <Route path="/news" element={<ItemPage />} />
        </Routes>
      </Router>
    </NewsProvider>
    </>
  )
}

export default App
