import * as React from "react";
import InputUnstyled, {
  InputUnstyledOwnProps,
  InputUnstyledProps,
} from "@mui/base/InputUnstyled";
import { styled } from "@mui/system";

const StyledInputElement = styled("input")`
  width: 95%;
  font-size: 1rem;
  font-family: Prompt, sans-serif;
  font-weight: 400;
  line-height: 1.4375em;
  background: rgb(243, 246, 249);
  border: 1px solid #e5e8ec;
  border-radius: 10px;
  padding: 6px 10px;
  color: #20262d;
  transition: width 300ms ease;

  &:hover {
    background: #eaeef3;
    border-color: #e5e8ec;
  }

  &:focus {
    outline: none;
    width: 100%;
    transition: width 200ms ease-out;
  }
`;

const CustomInput = React.forwardRef(function CustomInput(
  props: InputUnstyledProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <InputUnstyled
      components={{ Input: StyledInputElement }}
      {...props}
      ref={ref}
    />
  );
});

export default function Input(
  props: JSX.IntrinsicAttributes &
    Pick<
      InputUnstyledOwnProps &
        Omit<
          Pick<
            React.DetailedHTMLProps<
              React.HTMLAttributes<HTMLDivElement>,
              HTMLDivElement
            >,
            "key" | keyof React.HTMLAttributes<HTMLDivElement>
          > & {
            ref?:
              | ((instance: HTMLDivElement | null) => void)
              | React.RefObject<HTMLDivElement>
              | null
              | undefined;
          },
          keyof InputUnstyledOwnProps
        > & { component?: "div" | undefined },
      | "slot"
      | "style"
      | "title"
      | "color"
      | "translate"
      | "hidden"
      | keyof InputUnstyledOwnProps
      | "key"
      | "defaultChecked"
      | "suppressContentEditableWarning"
      | "suppressHydrationWarning"
      | "accessKey"
      | "contentEditable"
      | "contextMenu"
      | "dir"
      | "draggable"
      | "lang"
      | "spellCheck"
      | "tabIndex"
      | "radioGroup"
      | "role"
      | "about"
      | "datatype"
      | "inlist"
      | "prefix"
      | "property"
      | "resource"
      | "typeof"
      | "vocab"
      | "autoCapitalize"
      | "autoCorrect"
      | "autoSave"
      | "itemProp"
      | "itemScope"
      | "itemType"
      | "itemID"
      | "itemRef"
      | "results"
      | "security"
      | "unselectable"
      | "inputMode"
      | "is"
      | "aria-activedescendant"
      | "aria-atomic"
      | "aria-autocomplete"
      | "aria-busy"
      | "aria-checked"
      | "aria-colcount"
      | "aria-colindex"
      | "aria-colspan"
      | "aria-controls"
      | "aria-current"
      | "aria-details"
      | "aria-disabled"
      | "aria-dropeffect"
      | "aria-errormessage"
      | "aria-expanded"
      | "aria-flowto"
      | "aria-grabbed"
      | "aria-haspopup"
      | "aria-hidden"
      | "aria-invalid"
      | "aria-keyshortcuts"
      | "aria-level"
      | "aria-live"
      | "aria-modal"
      | "aria-multiline"
      | "aria-multiselectable"
      | "aria-orientation"
      | "aria-owns"
      | "aria-placeholder"
      | "aria-posinset"
      | "aria-pressed"
      | "aria-readonly"
      | "aria-relevant"
      | "aria-required"
      | "aria-roledescription"
      | "aria-rowcount"
      | "aria-rowindex"
      | "aria-rowspan"
      | "aria-selected"
      | "aria-setsize"
      | "aria-sort"
      | "aria-valuemax"
      | "aria-valuemin"
      | "aria-valuenow"
      | "aria-valuetext"
      | "children"
      | "dangerouslySetInnerHTML"
      | "onCopy"
      | "onCopyCapture"
      | "onCut"
      | "onCutCapture"
      | "onPaste"
      | "onPasteCapture"
      | "onCompositionEnd"
      | "onCompositionEndCapture"
      | "onCompositionStart"
      | "onCompositionStartCapture"
      | "onCompositionUpdate"
      | "onCompositionUpdateCapture"
      | "onFocusCapture"
      | "onBlurCapture"
      | "onChangeCapture"
      | "onBeforeInput"
      | "onBeforeInputCapture"
      | "onInput"
      | "onInputCapture"
      | "onReset"
      | "onResetCapture"
      | "onSubmit"
      | "onSubmitCapture"
      | "onInvalid"
      | "onInvalidCapture"
      | "onLoad"
      | "onLoadCapture"
      | "onError"
      | "onErrorCapture"
      | "onKeyDownCapture"
      | "onKeyPress"
      | "onKeyPressCapture"
      | "onKeyUpCapture"
      | "onAbort"
      | "onAbortCapture"
      | "onCanPlay"
      | "onCanPlayCapture"
      | "onCanPlayThrough"
      | "onCanPlayThroughCapture"
      | "onDurationChange"
      | "onDurationChangeCapture"
      | "onEmptied"
      | "onEmptiedCapture"
      | "onEncrypted"
      | "onEncryptedCapture"
      | "onEnded"
      | "onEndedCapture"
      | "onLoadedData"
      | "onLoadedDataCapture"
      | "onLoadedMetadata"
      | "onLoadedMetadataCapture"
      | "onLoadStart"
      | "onLoadStartCapture"
      | "onPause"
      | "onPauseCapture"
      | "onPlay"
      | "onPlayCapture"
      | "onPlaying"
      | "onPlayingCapture"
      | "onProgress"
      | "onProgressCapture"
      | "onRateChange"
      | "onRateChangeCapture"
      | "onSeeked"
      | "onSeekedCapture"
      | "onSeeking"
      | "onSeekingCapture"
      | "onStalled"
      | "onStalledCapture"
      | "onSuspend"
      | "onSuspendCapture"
      | "onTimeUpdate"
      | "onTimeUpdateCapture"
      | "onVolumeChange"
      | "onVolumeChangeCapture"
      | "onWaiting"
      | "onWaitingCapture"
      | "onAuxClick"
      | "onAuxClickCapture"
      | "onClickCapture"
      | "onContextMenu"
      | "onContextMenuCapture"
      | "onDoubleClick"
      | "onDoubleClickCapture"
      | "onDrag"
      | "onDragCapture"
      | "onDragEnd"
      | "onDragEndCapture"
      | "onDragEnter"
      | "onDragEnterCapture"
      | "onDragExit"
      | "onDragExitCapture"
      | "onDragLeave"
      | "onDragLeaveCapture"
      | "onDragOver"
      | "onDragOverCapture"
      | "onDragStart"
      | "onDragStartCapture"
      | "onDrop"
      | "onDropCapture"
      | "onMouseDown"
      | "onMouseDownCapture"
      | "onMouseEnter"
      | "onMouseLeave"
      | "onMouseMove"
      | "onMouseMoveCapture"
      | "onMouseOut"
      | "onMouseOutCapture"
      | "onMouseOver"
      | "onMouseOverCapture"
      | "onMouseUp"
      | "onMouseUpCapture"
      | "onSelect"
      | "onSelectCapture"
      | "onTouchCancel"
      | "onTouchCancelCapture"
      | "onTouchEnd"
      | "onTouchEndCapture"
      | "onTouchMove"
      | "onTouchMoveCapture"
      | "onTouchStart"
      | "onTouchStartCapture"
      | "onPointerDown"
      | "onPointerDownCapture"
      | "onPointerMove"
      | "onPointerMoveCapture"
      | "onPointerUp"
      | "onPointerUpCapture"
      | "onPointerCancel"
      | "onPointerCancelCapture"
      | "onPointerEnter"
      | "onPointerEnterCapture"
      | "onPointerLeave"
      | "onPointerLeaveCapture"
      | "onPointerOver"
      | "onPointerOverCapture"
      | "onPointerOut"
      | "onPointerOutCapture"
      | "onGotPointerCapture"
      | "onGotPointerCaptureCapture"
      | "onLostPointerCapture"
      | "onLostPointerCaptureCapture"
      | "onScroll"
      | "onScrollCapture"
      | "onWheel"
      | "onWheelCapture"
      | "onAnimationStart"
      | "onAnimationStartCapture"
      | "onAnimationEnd"
      | "onAnimationEndCapture"
      | "onAnimationIteration"
      | "onAnimationIterationCapture"
      | "onTransitionEnd"
      | "onTransitionEndCapture"
      | "component"
    > &
    React.RefAttributes<HTMLDivElement>
) {
  return <CustomInput {...props} />;
}
