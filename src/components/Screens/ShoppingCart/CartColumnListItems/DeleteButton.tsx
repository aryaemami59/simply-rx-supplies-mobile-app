import { Button } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback } from "react";

import useItemId from "../../../../hooks/useItemId";
import useVendorId from "../../../../hooks/useVendorId";
import { deleteOneItemFromCart } from "../../../../redux/addedSlice";
import { useAppDispatch } from "../../../../redux/hooks";
import { JC_SPACE_EVENLY } from "../../../../shared/styles/sharedStyles";
import type { OnPress } from "../../../../types/tsHelpers";
import DeleteIconNode from "./DeleteIconNode";

type Props = {
  reset: () => void;
};

const DeleteButton: FC<Props> = ({ reset }) => {
  const itemId = useItemId();
  const vendorId = useVendorId();
  const dispatch = useAppDispatch();

  const clickHandler = useCallback<OnPress>(() => {
    reset();
    dispatch(deleteOneItemFromCart({ itemId, vendorId }));
  }, [dispatch, itemId, reset, vendorId]);

  return (
    <Button
      icon={DeleteIconNode}
      size="md"
      title="Delete"
      color="error"
      onPress={clickHandler}
      buttonStyle={JC_SPACE_EVENLY}
    />
  );
};

export default memo<Props>(DeleteButton);
