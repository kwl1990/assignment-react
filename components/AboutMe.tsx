import aboutme from "../data/aboutme"
import AboutMeItem from "./AboutMeItem"
import Title from "./Title"

function AboutMe() : JSX.Element{
    return(
        <div className="flex flex-col sm:flex-row justify-center text-center my-20">
            <div className="justify-center text-center">
                <Title titlename="About Me" />
                {aboutme.map(item => (
                    <AboutMeItem 
                        topic={item.topic}
                        answer={item.answer}
                    />
                ))}
            </div>
        </div>
    )
}

export default AboutMe;