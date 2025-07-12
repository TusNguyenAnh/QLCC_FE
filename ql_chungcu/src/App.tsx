import './App.css'
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";

function App() {
    return (
        <SidebarProvider>
            <main>
                <SidebarTrigger />
            </main>
        </SidebarProvider>
    )
}

export default App
