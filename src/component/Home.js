import logo2 from "../utils/images/logo.png"
const Home=()=>{
    return (
            <div>
              <div className="absolute">  
                <img  className="relative h-screen w-screen"src="https://wallpapercave.com/wp/wp10615910.jpg" alt="" />
             </div>
             <div className="absolute  ml-3  ">
                <img className="w-40" src={logo2}alt="" />
             </div>
            </div>
           
    )
}
export default Home;
