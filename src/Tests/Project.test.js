import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react";
import HomePage from "../Components/HomePage";

describe("Pobando renderizado de componentes", ()  => {
    test("Renderizado de componente HomePage",() => {
        render(<HomePage />)
        const element = screen.getByRole("heading", { name: "Bienvenido a Administrador de Tareas" });
        expect(element).toBeInTheDocument();
    })
}) 