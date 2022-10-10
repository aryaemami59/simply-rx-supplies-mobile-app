import { Button } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import { ItemObjType, vendorNameType } from "../../../../../CustomTypes/types";
import { removeItems } from "../../../../redux/addedSlice";
import { useAppDispatch } from "../../../../redux/hooks";
import { JC_SPACE_EVENLY } from "../../../../shared/sharedStyles";
import DeleteIconNode from "./DeleteIconNode";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
  reset: () => void;
};

const DeleteButton: FC<Props> = ({ itemObj, vendorName, reset }) => {
  const dispatch = useAppDispatch();

  const clickHandler = useCallback(() => {
    reset();
    dispatch(removeItems({ itemObj, vendorName }));
  }, [dispatch, itemObj, reset, vendorName]);

  return (
    <Button
      icon={DeleteIconNode}
      size="md"
      title="Delete"
      color="error"
      onPress={clickHandler}
      buttonStyle={[JC_SPACE_EVENLY]}
    />
  );
};

export default memo<Props>(DeleteButton);
