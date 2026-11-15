---
'@ptbdynamic/plinth-css': minor
'@ptbdynamic/plinth-vue': minor
'@ptbdynamic/plinth-react': minor
'@ptbdynamic/plinth-blade': minor
---

Data table: columns with a priority give way as the table narrows, whatever the screen's width.
`data-priority` (`priority` in Blade, Vue and React) on a column header and its cells: 3 shows
from 960px of container, 2 from 640px, 1 always. The frame is a size container from 768px up,
and `contained` wraps a table without a frame in `plinth-data-table-container`, which is one too.
