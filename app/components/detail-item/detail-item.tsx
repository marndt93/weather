export function DetailItem(props: {icon: string, value: string, before?: string, after?: string, iconSize?: number}) {
    return (
        <div className="detail-item flex flex-row gap-[5px]">
            <span className="material-symbols-outlined" style={{fontSize: `${props.iconSize || 26}px`, height: `${props.iconSize || 26}px`}}>
                {props.icon}
            </span>
            <div>
                <span>{props.before}</span>
                <span>{props.value}</span>
                <span>{props.after}</span>
            </div>
        </div>
    );
}