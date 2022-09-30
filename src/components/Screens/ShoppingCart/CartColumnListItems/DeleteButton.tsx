import { Button } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import DeleteIconNode from "./DeleteIconNode";
import { ItemObjType, vendorNameType } from "../../../../../CustomTypes/types";
import { useAppDispatch } from "../../../../redux/hooks";
import { removeItems } from "../../../../redux/addedSlice";
import { JC_SPACE_EVENLY } from "../../../../shared/sharedStyles";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const DeleteButton: FC<Props> = ({ itemObj, vendorName }): JSX.Element => {
  const dispatch = useAppDispatch();

  const clickHandler = useCallback(() => {
    dispatch(removeItems({ itemObj, vendorName }));
  }, [dispatch, itemObj, vendorName]);

  return (
    <>
      <Button
        icon={DeleteIconNode}
        size="lg"
        title="Delete"
        color="error"
        onPress={clickHandler}
        buttonStyle={[JC_SPACE_EVENLY]}
      />
    </>
  );
};

export default memo<Props>(DeleteButton);
