
type aboutMeProps ={
    topic: string,
    answer: string
}

function AboutMeItem({topic, answer} : aboutMeProps) : JSX.Element{
    return(
        <ol className="flex flex-col border-stone-200">
            <li className="mb-10 ">
                
                <p className="gap-4  items-center text-xs md:text-sm">
                    <span className="text-lg font-semibold text-stone-900">
                        {topic}
                    </span>
                </p>
                <p className="my-2 text-base font-normal text-stone-500">
                    {answer}
                </p>
            </li>
        </ol>
    )
}

export default AboutMeItem;