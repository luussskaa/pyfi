import React from 'react'
import PreviousMonthsItem from './PreviousMonthsItem'

export default function PreviousMonthsContainer({ previousMonths }) {
    return (
        <div className="px-10 mt-5 flex flex-wrap">
            {previousMonths.map(e =>
                <PreviousMonthsItem key={e.id} name={e.name} value={e.money} />
            )}
        </div>
    )
}
