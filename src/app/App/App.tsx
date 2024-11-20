import Layout from '../../shared/ui/Layout';
import { Outlet } from "react-router-dom";
import Header from "../../widgets/Header/Header.tsx";
import { theme } from "../../shared/config/theme.ts";
import { ThemeProvider } from "../ThemeProvider";


function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header/>
        <Layout>
          <Outlet />
        </Layout>
      </ThemeProvider>

    </>
  )
}

export default App;
