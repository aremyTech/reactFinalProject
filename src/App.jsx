import React, { Suspense } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { useColorMode, Box } from "@chakra-ui/react";
import { TaskProvider } from "./Context/TaskContext";
import Navbar from "./Components/Navbar";
import Footer from "../src/Components/Footer";
import "./styles/global.css";


const App = () => {
  const{ colorMode, toggleColorMode } = useColorMode(); //Manejo del modo claro/oscuro

  const HomePage = React.lazy(() => import("./Components/HomePage"));
  const TaskPage = React.lazy(() => import("./Components/TaskPage"));
  const TaskCalendar = React.lazy(() => import("./Components/TaskCalendar"));

  return (
    <ChakraProvider>
      <TaskProvider>
        <Router>
          <Box>
            <div className="nav">
              <Navbar />
            </div>
            <div>
              <div className="app-layout">
                <main className="main-content">
                  {/*Carga diferida de componentes*/}
                  <Routes>
                    <Route
                      index element={
                        <Suspense fallback="suspended component">
                          <HomePage />
                        </Suspense>
                      }
                    />
                    <Route
                      path="tasks"  element={
                        <Suspense fallback="suspended component">
                          <TaskPage />
                        </Suspense>
                      }
                    />
                    <Route
                      path="TaskCalendar"  element={
                        <Suspense fallback="suspended component">
                          <TaskCalendar />
                        </Suspense>
                      }
                    />
                  </Routes>
                </main>
              </div>
              <div className="footer">
                <Footer />
              </div>
            </div>
          </Box>
        </Router>
      </TaskProvider>
    </ChakraProvider>
  );
};

export default App;
