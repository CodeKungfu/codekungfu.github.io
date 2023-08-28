export function Nav(props) {
    const LanguageList = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
    return (
        <div className="flex items-center justify-center my-2">
            {LanguageList.map((item) => {
                const isActive = item.toLocaleLowerCase() === props.language.toLocaleLowerCase();
                return (
                <button
                    className={`mx-2 ${isActive ? "text-orange-500" : ""}`}
                    key={item}
                    onClick={() => props.change(item)}
                >
                    {item}
                </button>
                );
            })}
        </div>
    )
}