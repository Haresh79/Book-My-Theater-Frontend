import Header from "@/component/Header";

export default function Layout({ children }){
    return(<>
        <Header/>
        <main>{children}</main>
    </>)
}