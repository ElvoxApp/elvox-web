import AppealListItem from "./AppealListItem"

const AppealsList = ({ appeals }) => {
    return (
        <div className='flex flex-col gap-3.5'>
            {appeals.map((appeal) => (
                <AppealListItem
                    key={appeal.id}
                    appeal={appeal}
                />
            ))}
        </div>
    )
}

export default AppealsList
