import { NativeSelect, Typography } from "@mui/material";

const Dropdown = ({ ItemList, ClickItem, Label, DefaultValue }) => {
    return (<>
        <Typography>{Label}</Typography>
        <NativeSelect value={DefaultValue}
            onChange={(e) => ClickItem(e.target.value)}>
            {ItemList?.map((Item, i) => {
                return (
                    <option value={Item.Value} key={i}>
                        {Item.Name}
                    </option>
                );
            })}
        </NativeSelect>

    </>)
}

export default Dropdown