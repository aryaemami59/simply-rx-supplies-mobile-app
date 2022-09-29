import { FC, memo, useCallback } from "react";
import { clearListItems } from "../../redux/addedSlice";
import { useAppDispatch } from "../../redux/hooks";
import { EvilIcons } from "@expo/vector-icons";
import { ICON_GRAY_COLOR } from "../../shared/sharedStyles";

type Props = {
  props: string;
};

const ClearIcon: FC = (props): JSX.Element => {
  const dispatch = useAppDispatch();

  const clickHandler = useCallback((): void => {
    dispatch(clearListItems());
    // setVal("");
    // inputRef.current && inputRef.current.focus();
  }, [dispatch]);

  return (
    <>
      <EvilIcons
        name="close"
        color={ICON_GRAY_COLOR}
        onPress={clickHandler}
        size={24}
      />
    </>
  );
};

export default memo(ClearIcon);
