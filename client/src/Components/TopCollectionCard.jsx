const TopCollectionCard = ({photo,name}) => {
  return (
    <div className="">
        <div className="border-2 border-black rounded-3xl w-[259px] h-[259px] mx-auto" >
            <img src={photo} alt="" className="rounded-3xl" />
            <h2 className='font-bold text-[1.5rem] p-2 m-auto mt-4 mb-2 flex justify-center'>{name}</h2>
        </div>
    </div>
  )
}
export default TopCollectionCard