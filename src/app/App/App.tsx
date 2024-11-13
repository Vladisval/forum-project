import Layout from '../../shared/ui/Layout';
import './App.scss'
import { Outlet } from "react-router-dom";
import Header from "../../widgets/Header/Header.tsx";
import { CssBaseline } from "@mui/material";



function App() {

  return (
    <>
      <CssBaseline />
      <Header/>
      <Layout>
        <Outlet />
      </Layout>
    </>

  )
}

export default App
