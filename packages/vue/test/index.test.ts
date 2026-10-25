import { createApp } from 'vue';
import { describe, expect, it } from 'vitest';
import {
  Plinth,
  PlinthAppBar,
  PlinthAppBarSearch,
  PlinthAppNav,
  PlinthAppNavItem,
  PlinthAppShell,
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
  PlinthNavList,
  PlinthNavListGroup,
  PlinthNavListItem,
  PlinthPageHeader,
  PlinthPill,
  PlinthPillRow,
  PlinthSectionMenu,
  PlinthSectionMenuItem,
  PlinthSheet,
  PlinthSplitView,
  PlinthStat,
  PlinthTextarea,
  PlinthTextField,
} from '../src/index.ts';

describe('the Plinth plugin', () => {
  it('registers every component', () => {
    const app = createApp({});
    app.use(Plinth);

    expect(app.component('PlinthAppBar')).toBe(PlinthAppBar);
    expect(app.component('PlinthAppBarSearch')).toBe(PlinthAppBarSearch);
    expect(app.component('PlinthAppNav')).toBe(PlinthAppNav);
    expect(app.component('PlinthAppNavItem')).toBe(PlinthAppNavItem);
    expect(app.component('PlinthAppShell')).toBe(PlinthAppShell);
    expect(app.component('PlinthAvatar')).toBe(PlinthAvatar);
    expect(app.component('PlinthBadge')).toBe(PlinthBadge);
    expect(app.component('PlinthButton')).toBe(PlinthButton);
    expect(app.component('PlinthCallout')).toBe(PlinthCallout);
    expect(app.component('PlinthCodeBlock')).toBe(PlinthCodeBlock);
    expect(app.component('PlinthConfirmDialog')).toBe(PlinthConfirmDialog);
    expect(app.component('PlinthDataTable')).toBe(PlinthDataTable);
    expect(app.component('PlinthDataTableCell')).toBe(PlinthDataTableCell);
    expect(app.component('PlinthDataTableColumn')).toBe(PlinthDataTableColumn);
    expect(app.component('PlinthDataTableEmpty')).toBe(PlinthDataTableEmpty);
    expect(app.component('PlinthDataTableRow')).toBe(PlinthDataTableRow);
    expect(app.component('PlinthDataTableSort')).toBe(PlinthDataTableSort);
    expect(app.component('PlinthDialog')).toBe(PlinthDialog);
    expect(app.component('PlinthDrawer')).toBe(PlinthDrawer);
    expect(app.component('PlinthEmptyState')).toBe(PlinthEmptyState);
    expect(app.component('PlinthIcon')).toBe(PlinthIcon);
    expect(app.component('PlinthIconButton')).toBe(PlinthIconButton);
    expect(app.component('PlinthListCard')).toBe(PlinthListCard);
    expect(app.component('PlinthListRow')).toBe(PlinthListRow);
    expect(app.component('PlinthMenu')).toBe(PlinthMenu);
    expect(app.component('PlinthMenuGroup')).toBe(PlinthMenuGroup);
    expect(app.component('PlinthMenuItem')).toBe(PlinthMenuItem);
    expect(app.component('PlinthMenuSeparator')).toBe(PlinthMenuSeparator);
    expect(app.component('PlinthMenuSheet')).toBe(PlinthMenuSheet);
    expect(app.component('PlinthNavList')).toBe(PlinthNavList);
    expect(app.component('PlinthNavListGroup')).toBe(PlinthNavListGroup);
    expect(app.component('PlinthNavListItem')).toBe(PlinthNavListItem);
    expect(app.component('PlinthPageHeader')).toBe(PlinthPageHeader);
    expect(app.component('PlinthPill')).toBe(PlinthPill);
    expect(app.component('PlinthPillRow')).toBe(PlinthPillRow);
    expect(app.component('PlinthSectionMenu')).toBe(PlinthSectionMenu);
    expect(app.component('PlinthSectionMenuItem')).toBe(PlinthSectionMenuItem);
    expect(app.component('PlinthSheet')).toBe(PlinthSheet);
    expect(app.component('PlinthSplitView')).toBe(PlinthSplitView);
    expect(app.component('PlinthStat')).toBe(PlinthStat);
    expect(app.component('PlinthTextarea')).toBe(PlinthTextarea);
    expect(app.component('PlinthTextField')).toBe(PlinthTextField);
  });
});
