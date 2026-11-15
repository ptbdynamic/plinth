<?php

namespace BDynamic\Plinth\Enums;

/**
 * A data table column's priority as the table narrows: 3 shows from the widest container, 2 from
 * a narrower one, 1 always.
 */
enum DataTablePriority: string
{
    use ResolvesToDefault;

    case One = '1';
    case Two = '2';
    case Three = '3';

    public static function default(): self
    {
        return self::One;
    }
}
