import Navbar from '@/components/navbar'

const OverviewLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <div className='container my-8'>{children}</div>
        </>
    )
}

export default OverviewLayout
