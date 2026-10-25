import type { App, Plugin } from 'vue';
import PlinthAvatar from './PlinthAvatar.vue';
import PlinthBadge from './PlinthBadge.vue';
import PlinthButton from './PlinthButton.vue';
import PlinthCallout from './PlinthCallout.vue';
import PlinthCodeBlock from './PlinthCodeBlock.vue';
import PlinthConfirmDialog from './PlinthConfirmDialog.vue';
import PlinthDataTable from './PlinthDataTable.vue';
import PlinthDataTableCell from './PlinthDataTableCell.vue';
import PlinthDataTableColumn from './PlinthDataTableColumn.vue';
import PlinthDataTableEmpty from './PlinthDataTableEmpty.vue';
import PlinthDataTableRow from './PlinthDataTableRow.vue';
import PlinthDataTableSort from './PlinthDataTableSort.vue';
import PlinthDialog from './PlinthDialog.vue';
import PlinthDrawer from './PlinthDrawer.vue';
import PlinthEmptyState from './PlinthEmptyState.vue';
import PlinthIcon from './PlinthIcon.vue';
import PlinthIconButton from './PlinthIconButton.vue';
import PlinthListCard from './PlinthListCard.vue';
import PlinthListRow from './PlinthListRow.vue';
import PlinthMenu from './PlinthMenu.vue';
import PlinthMenuGroup from './PlinthMenuGroup.vue';
import PlinthMenuItem from './PlinthMenuItem.vue';
import PlinthMenuSeparator from './PlinthMenuSeparator.vue';
import PlinthMenuSheet from './PlinthMenuSheet.vue';
import PlinthPageHeader from './PlinthPageHeader.vue';
import PlinthPill from './PlinthPill.vue';
import PlinthPillRow from './PlinthPillRow.vue';
import PlinthSectionMenu from './PlinthSectionMenu.vue';
import PlinthSectionMenuItem from './PlinthSectionMenuItem.vue';
import PlinthSheet from './PlinthSheet.vue';
import PlinthStat from './PlinthStat.vue';
import PlinthTextarea from './PlinthTextarea.vue';
import PlinthTextField from './PlinthTextField.vue';

export {
  PlinthAvatar,
  PlinthBadge,
  PlinthButton,
  PlinthCallout,
  PlinthCodeBlock,
  PlinthConfirmDialog,
  PlinthDataTable,
  PlinthDataTableCell,
  PlinthDataTableColumn,
  PlinthDataTableEmpty,
  PlinthDataTableRow,
  PlinthDataTableSort,
  PlinthDialog,
  PlinthDrawer,
  PlinthEmptyState,
  PlinthIcon,
  PlinthIconButton,
  PlinthListCard,
  PlinthListRow,
  PlinthMenu,
  PlinthMenuGroup,
  PlinthMenuItem,
  PlinthMenuSeparator,
  PlinthMenuSheet,
  PlinthPageHeader,
  PlinthPill,
  PlinthPillRow,
  PlinthSectionMenu,
  PlinthSectionMenuItem,
  PlinthSheet,
  PlinthStat,
  PlinthTextarea,
  PlinthTextField,
};
export { avatarGlyph, avatarSizes, initialsFrom, type AvatarSize } from './avatar';
export { buttonVariants, type ButtonVariant } from './button';
export {
  calloutIcons,
  calloutRole,
  calloutRoles,
  calloutTone,
  calloutTones,
  type CalloutRole,
  type CalloutTone,
} from './callout';
export { type CodeBlockTab } from './code-block';
export {
  confirmDialogFieldLabels,
  confirmDialogKind,
  confirmDialogKinds,
  confirmDialogPattern,
  confirmDialogTone,
  confirmDialogTones,
  type ConfirmDialogKind,
  type ConfirmDialogTone,
} from './confirm-dialog';
export {
  dataTableCellKind,
  dataTableCellKinds,
  dataTableSort,
  dataTableSortIcon,
  dataTableSorts,
  type DataTableCellKind,
  type DataTableSort,
} from './data-table';
export { dialogCloseIcon, dialogSidePhone, dialogSidePhones, type DialogSidePhone } from './dialog';
export {
  drawerCloseIcon,
  drawerDesktop,
  drawerDesktops,
  drawerSnap,
  drawerSnapPoints,
  drawerSnaps,
  type DrawerDesktop,
  type DrawerSnap,
} from './drawer';
export { headingLevel, headingLevels, type HeadingLevel } from './heading';
export { controlSizes, iconSizeFor, resolveSize, sizes, type ControlSize, type Size } from './size';
export {
  iconGlyph,
  iconGlyphs,
  iconNames,
  iconSizes,
  mirroredIconNames,
  type IconName,
  type IconSize,
} from './icon';
export { listRowChevron } from './list-row';
export { menuIdKey, menuItemTone, menuItemTones, type MenuItemTone } from './menu';
export { pageHeaderLevel, pageHeaderLevels, type PageHeaderLevel } from './page-header';
export { sheetCloseIcon, sheetSide, sheetSidePhone, sheetSides, type SheetSide } from './sheet';
export { fieldDescribedBy, textFieldSize, textFieldSizes, type TextFieldSize } from './text-field';
export { swipeToClose, useSwipeToClose } from './swipe';
export { statChevron } from './stat';
export { tones, type Tone } from './tones';

/** Registers every Plinth component globally: `app.use(Plinth)`. */
export const Plinth: Plugin = {
  install(app: App) {
    app.component('PlinthAvatar', PlinthAvatar);
    app.component('PlinthBadge', PlinthBadge);
    app.component('PlinthButton', PlinthButton);
    app.component('PlinthCallout', PlinthCallout);
    app.component('PlinthCodeBlock', PlinthCodeBlock);
    app.component('PlinthConfirmDialog', PlinthConfirmDialog);
    app.component('PlinthDataTable', PlinthDataTable);
    app.component('PlinthDataTableCell', PlinthDataTableCell);
    app.component('PlinthDataTableColumn', PlinthDataTableColumn);
    app.component('PlinthDataTableEmpty', PlinthDataTableEmpty);
    app.component('PlinthDataTableRow', PlinthDataTableRow);
    app.component('PlinthDataTableSort', PlinthDataTableSort);
    app.component('PlinthDialog', PlinthDialog);
    app.component('PlinthDrawer', PlinthDrawer);
    app.component('PlinthEmptyState', PlinthEmptyState);
    app.component('PlinthIcon', PlinthIcon);
    app.component('PlinthIconButton', PlinthIconButton);
    app.component('PlinthListCard', PlinthListCard);
    app.component('PlinthListRow', PlinthListRow);
    app.component('PlinthMenu', PlinthMenu);
    app.component('PlinthMenuGroup', PlinthMenuGroup);
    app.component('PlinthMenuItem', PlinthMenuItem);
    app.component('PlinthMenuSeparator', PlinthMenuSeparator);
    app.component('PlinthMenuSheet', PlinthMenuSheet);
    app.component('PlinthPageHeader', PlinthPageHeader);
    app.component('PlinthPill', PlinthPill);
    app.component('PlinthPillRow', PlinthPillRow);
    app.component('PlinthSectionMenu', PlinthSectionMenu);
    app.component('PlinthSectionMenuItem', PlinthSectionMenuItem);
    app.component('PlinthSheet', PlinthSheet);
    app.component('PlinthStat', PlinthStat);
    app.component('PlinthTextarea', PlinthTextarea);
    app.component('PlinthTextField', PlinthTextField);
  },
};
