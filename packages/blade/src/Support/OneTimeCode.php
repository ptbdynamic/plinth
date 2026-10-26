<?php

namespace BDynamic\Plinth\Support;

final class OneTimeCode
{
    /** The lengths a one-time code can have (one-time-code.css); 6 is the default. */
    public const LENGTHS = [4, 5, 6, 7, 8];

    /** A length from the list, or 6 when it is not one of them. Vue's and React's oneTimeCodeLength() do the same. */
    public static function length(mixed $value): int
    {
        $length = filter_var($value, FILTER_VALIDATE_INT);

        return in_array($length, self::LENGTHS, true) ? $length : 6;
    }
}
