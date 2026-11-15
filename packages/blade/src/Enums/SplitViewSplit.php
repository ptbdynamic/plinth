<?php

namespace BDynamic\Plinth\Enums;

/**
 * Where a split view puts the list and the detail side by side: from 768px (md, the default) or
 * from 1280px (lg), showing one pane up to there as a phone does.
 */
enum SplitViewSplit: string
{
    use ResolvesToDefault;

    case Md = 'md';
    case Lg = 'lg';

    public static function default(): self
    {
        return self::Md;
    }
}
