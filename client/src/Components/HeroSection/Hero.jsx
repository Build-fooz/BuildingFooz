import './Herosec.css'
import bg from "../.././../public/backgroundImage.png"
import { FaArrowRight } from "react-icons/fa6";
const Hero = () => {
  const styles = {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };
  return (
    <div className='mt-[1px] mr-[55px]' >
      <main className='m-auto h-[84vh]' style={styles}>
        <div className=' h-full w-full flex flex-col justify-center px-[10rem] ' >
          <div className="relative">
            <div className="absolute top-0 right-[58%] bg-red-500 text-white rounded-full w-[155px] h-[155px] flex items-center justify-center font-bold text-center rotate-[25deg]">
              <h2 className='font-bold text-[1.5rem]'>Deal of the Day</h2>
            </div>
          </div>
          <h2 className='font-bold text-[2.5rem]'>Deal of the Day</h2>
          <h1 className='text-[#eb1414] font-bold text-[5rem]' >50% <span className=' text-black align-super text-[2.5rem] ' >OFF</span></h1>
          <h2 className='font-bold text-[2.5rem]'>Elevate Every Meal</h2>
          <h2 className='font-bold text-[2.5rem]'>With Fooz</h2>

          <button className=' flex items-center justify-center gap-2 w-[10rem]  py-[10px]  rounded-3xl text-white bg-[#eb1414] hover:bg-[#FFBDBD] mt-[3rem]' >
            <span>Explore Now</span>
            <FaArrowRight />
          </button>
        </div>

      </main>
    </div>
  )
}
export default Hero