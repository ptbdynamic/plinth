<?php

namespace BDynamic\Plinth\Enums;

/** The page header's heading: the page's <h1>, or a lower level beside another page's <h1>. */
enum PageHeaderLevel: string
{
    use ResolvesToDefault;

    case One = 'h1';
    case Two = 'h2';
    case Three = 'h3';
    case Four = 'h4';
    case Five = 'h5';
    case Six = 'h6';

    public static function default(): self
    {
        return self::One;
    }
}
