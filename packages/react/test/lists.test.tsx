import { describe, expect, it } from 'vitest';
import * as vueAvatar from '../../vue/src/avatar.ts';
import * as vueCallout from '../../vue/src/callout.ts';
import * as vueDataTable from '../../vue/src/data-table.ts';
import * as vueConfirmDialog from '../../vue/src/confirm-dialog.ts';
import * as vueDialog from '../../vue/src/dialog.ts';
import * as vueDrawer from '../../vue/src/drawer.ts';
import * as vueSwipe from '../../vue/src/swipe.ts';
import * as vueHeading from '../../vue/src/heading.ts';
import * as vuePageHeader from '../../vue/src/page-header.ts';
import * as vueListRow from '../../vue/src/list-row.ts';
import * as vueMenu from '../../vue/src/menu.ts';
import * as vueSheet from '../../vue/src/sheet.ts';
import * as vueSplitView from '../../vue/src/split-view.ts';
import * as vueStat from '../../vue/src/stat.ts';
import * as vueButton from '../../vue/src/button.ts';
import * as vueIcon from '../../vue/src/icon.ts';
import * as vueSize from '../../vue/src/size.ts';
import * as vueTones from '../../vue/src/tones.ts';
import * as vueTextField from '../../vue/src/text-field.ts';
import { buttonVariant } from '../src/button.ts';
import { iconName } from '../src/icon.ts';
import { swipeToClose } from '../src/swipe.ts';
import { classNames, hasContent } from '../src/markup.ts';
import {
  avatarGlyph,
  avatarSizes,
  buttonVariants,
  calloutIcons,
  calloutRole,
  calloutRoles,
  calloutTone,
  calloutTones,
  confirmDialogFieldLabels,
  confirmDialogKind,
  confirmDialogKinds,
  confirmDialogPattern,
  confirmDialogTone,
  confirmDialogTones,
  controlSizes,
  dataTableCellKind,
  dataTableCellKinds,
  dataTableSort,
  dataTableSortIcon,
  dataTableSorts,
  dialogCloseIcon,
  dialogSidePhone,
  dialogSidePhones,
  drawerCloseIcon,
  drawerDesktop,
  drawerDesktops,
  drawerSnap,
  drawerSnapPoints,
  drawerSnaps,
  headingLevel,
  headingLevels,
  pageHeaderLevel,
  pageHeaderLevels,
  iconGlyph,
  iconGlyphs,
  iconNames,
  iconSizeFor,
  iconSizes,
  mirroredIconNames,
  listRowChevron,
  statChevron,
  menuItemTone,
  menuItemTones,
  resolveSize,
  sheetCloseIcon,
  sheetSide,
  sheetSidePhone,
  sheetSides,
  splitViewPane,
  splitViewPanes,
  sizes,
  textFieldSize,
  textFieldSizes,
  tones,
} from '../src/index.ts';

describe('the shared lists', () => {
  it('match the Vue layer’s lists, which Blade’s enums and the stories follow', () => {
    expect(tones).toEqual(vueTones.tones);
    expect(buttonVariants).toEqual(vueButton.buttonVariants);
    expect(sizes).toEqual(vueSize.sizes);
    expect(controlSizes).toEqual(vueSize.controlSizes);
    expect(textFieldSizes).toEqual(vueTextField.textFieldSizes);
    expect(iconSizes).toEqual(vueIcon.iconSizes);
    expect(iconNames).toEqual(vueIcon.iconNames);
    expect(iconGlyphs).toEqual(vueIcon.iconGlyphs);
    expect(mirroredIconNames).toEqual(vueIcon.mirroredIconNames);
    expect(iconGlyph('menu')).toBe(vueIcon.iconGlyph('menu'));
    expect(calloutTones).toEqual(vueCallout.calloutTones);
    expect(calloutRoles).toEqual(vueCallout.calloutRoles);
    expect(calloutIcons).toEqual(vueCallout.calloutIcons);
    expect(avatarSizes).toEqual(vueAvatar.avatarSizes);
    expect(avatarGlyph).toBe(vueAvatar.avatarGlyph);
    expect(dataTableSorts).toEqual(vueDataTable.dataTableSorts);
    expect(dataTableCellKinds).toEqual(vueDataTable.dataTableCellKinds);
    expect(dataTableSortIcon).toBe(vueDataTable.dataTableSortIcon);
    expect(headingLevels).toEqual(vueHeading.headingLevels);
    expect(pageHeaderLevels).toEqual(vuePageHeader.pageHeaderLevels);
    expect(listRowChevron).toBe(vueListRow.listRowChevron);
    expect(statChevron).toBe(vueStat.statChevron);
    expect(menuItemTones).toEqual(vueMenu.menuItemTones);
    expect(sheetSides).toEqual(vueSheet.sheetSides);
    expect(splitViewPanes).toEqual(vueSplitView.splitViewPanes);
    expect(sheetCloseIcon).toBe(vueSheet.sheetCloseIcon);
    expect(dialogSidePhones).toEqual(vueDialog.dialogSidePhones);
    expect(dialogCloseIcon).toBe(vueDialog.dialogCloseIcon);
    expect(drawerDesktops).toEqual(vueDrawer.drawerDesktops);
    expect(drawerSnaps).toEqual(vueDrawer.drawerSnaps);
    expect(drawerCloseIcon).toBe(vueDrawer.drawerCloseIcon);
    // The swipe is written once per layer; the React copy is the Vue one.
    expect(swipeToClose.toString()).toBe(vueSwipe.swipeToClose.toString());
    expect(confirmDialogKinds).toEqual(vueConfirmDialog.confirmDialogKinds);
    expect(confirmDialogTones).toEqual(vueConfirmDialog.confirmDialogTones);
    expect(confirmDialogFieldLabels).toEqual(vueConfirmDialog.confirmDialogFieldLabels);
    const phrase = 'a.b*c (d) [e] {f} |g\\h/i^$+? <j>';
    expect(confirmDialogPattern(phrase)).toBe(vueConfirmDialog.confirmDialogPattern(phrase));
  });

  it('fall back the way the Vue layer does', () => {
    expect(buttonVariant('loud')).toBe('primary');
    expect(buttonVariant('danger-ghost')).toBe('danger-ghost');
    expect(resolveSize('xl', controlSizes, 'md')).toBe('md');
    expect(textFieldSize('lg')).toBe('md');
    expect(textFieldSize('sm')).toBe('sm');
    expect(calloutTone('loud')).toBe('neutral');
    expect(calloutTone('info')).toBe('info');
    expect(calloutRole('log')).toBe('note');
    expect(calloutRole('alert')).toBe('alert');
    expect(dataTableSort('sideways')).toBe('none');
    expect(dataTableCellKind('header')).toBe('field');
    expect(headingLevel('h1')).toBe('h2');
    expect(pageHeaderLevel('h7')).toBe('h1');
    expect(pageHeaderLevel('h3')).toBe('h3');
    expect(sheetSide('left')).toBe('end');
    expect(sheetSide('top')).toBe('top');
    expect(splitViewPane('side')).toBe('list');
    expect(splitViewPane('detail')).toBe('detail');
    expect(sheetSidePhone('left')).toBeUndefined();
    expect(sheetSidePhone('bottom')).toBe('bottom');
    expect(dialogSidePhone('top')).toBe('center');
    expect(dialogSidePhone('bottom')).toBe('bottom');
    expect(drawerDesktop('side')).toBe(vueDrawer.drawerDesktop('side'));
    expect(drawerSnapPoints('full peek')).toEqual(vueDrawer.drawerSnapPoints('full peek'));
    expect(drawerSnap('top', ['peek'])).toBe(vueDrawer.drawerSnap('top', ['peek']));
    expect(confirmDialogKind('pin')).toBe('simple');
    expect(confirmDialogKind('password')).toBe('password');
    expect(confirmDialogTone('loud')).toBe('neutral');
    expect(confirmDialogTone('danger')).toBe('danger');
    expect(menuItemTone('loud')).toBe(vueMenu.menuItemTone('loud'));
    expect(iconName('rocket')).toBe(vueIcon.iconName('rocket'));
    expect(iconName('sun')).toBe('sun');
    expect(sizes.map(iconSizeFor)).toEqual(['sm', 'sm', 'md', 'md', 'md']);
  });
});

describe('the markup helpers', () => {
  it('put a project class after Plinth’s, and ignore a blank one', () => {
    expect(classNames('plinth-badge', ' ms-2 ')).toBe('plinth-badge ms-2');
    expect(classNames('plinth-badge', ' ')).toBe('plinth-badge');
    expect(classNames('plinth-badge', undefined)).toBe('plinth-badge');
  });

  it('tell a node that prints something from one that does not', () => {
    expect([null, undefined, false, true, '', '  '].map(hasContent)).toEqual([
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
    expect(['x', 0].map(hasContent)).toEqual([true, true]);
    expect([[], [false, null, ' '], <></>, <>{false}</>, <>{[]}</>].map(hasContent)).toEqual([
      false,
      false,
      false,
      false,
      false,
    ]);
    expect([['x'], <>x</>, <i />].map(hasContent)).toEqual([true, true, true]);
  });
});
