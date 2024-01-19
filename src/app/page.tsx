import CalculateBMI from '@/app/components/home/CalculateBMI';
import ChooseUs from '@/app/components/home/ChooseUs';
import Deposition from '@/app/components/home/Depositions';
import Index from '@/app/components/home/Index';
import IndexCards from '@/app/components/home/IndexCards';
import InfoIsland from '@/app/components/home/InfoIsland';
import OferedClasses from '@/app/components/home/OferedClasses';
import OurTeam from '@/app/components/home/OurTeam';
import PricePlans from '@/app/components/home/PricePlans';

export default function Home() {
  return (
    <main>
        <Index />
        <IndexCards />
        <InfoIsland />
        <OferedClasses />
        <ChooseUs />
        <OurTeam />
        <Deposition />
        <CalculateBMI />
        <PricePlans />
        <div id="root"></div>
    </main>
  )
}