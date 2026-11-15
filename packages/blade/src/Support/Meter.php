<?php

namespace BDynamic\Plinth\Support;

use BDynamic\Plinth\Enums\Tone;

/** A meter's numbers and tone (meter.css). Vue's and React's meterRange() and meterTone() do the same. */
final class Meter
{
    /** A finite number, or null for anything else (a blank string included). */
    public static function number(mixed $value): int|float|null
    {
        if (is_string($value)) {
            $value = trim($value);
        }
        if ((! is_int($value) && ! is_float($value) && ! is_string($value)) || ! is_numeric($value)) {
            return null;
        }
        $number = $value + 0;

        return is_finite($number) ? $number : null;
    }

    /**
     * The numbers the meter prints: min 0 and max 100 by default, a missing value is the minimum.
     *
     * @return array{value: int|float, min: int|float, max: int|float, low: int|float|null, high: int|float|null, optimum: int|float|null}
     */
    public static function range(mixed $value, mixed $min, mixed $max, mixed $low, mixed $high, mixed $optimum): array
    {
        $min = self::number($min) ?? 0;

        return [
            'value' => self::number($value) ?? $min,
            'min' => $min,
            'max' => self::number($max) ?? 100,
            'low' => self::number($low),
            'high' => self::number($high),
            'optimum' => self::number($optimum),
        ];
    }

    /**
     * The tone of a meter: the one the app chose, or else the browser's region for its numbers
     * (optimum: neutral, suboptimal: warning, even less good: danger), and danger past the maximum of a
     * cap (an optimum below low).
     *
     * @param  array{value: int|float, min: int|float, max: int|float, low: int|float|null, high: int|float|null, optimum: int|float|null}  $range
     */
    public static function tone(array $range, mixed $chosen = null): Tone
    {
        if ($chosen instanceof Tone) {
            return $chosen;
        }
        if (is_string($chosen) && Tone::tryFrom($chosen) !== null) {
            return Tone::from($chosen);
        }
        $min = $range['min'];
        $max = max($range['max'], $min);
        $clamp = fn (int|float $number, int|float $lower): int|float => min(max($number, $lower), $max);
        $current = $clamp($range['value'], $min);
        $lowest = $range['low'] === null ? $min : $clamp($range['low'], $min);
        $highest = $range['high'] === null ? $max : $clamp($range['high'], $lowest);
        $best = $range['optimum'] === null ? ($min + $max) / 2 : $clamp($range['optimum'], $min);
        if ($best < $lowest) {
            if ($current <= $lowest) {
                return Tone::Neutral;
            }

            return $current <= $highest && $range['value'] <= $max ? Tone::Warning : Tone::Danger;
        }
        if ($best > $highest) {
            if ($current >= $highest) {
                return Tone::Neutral;
            }

            return $current >= $lowest ? Tone::Warning : Tone::Danger;
        }

        return $current >= $lowest && $current <= $highest ? Tone::Neutral : Tone::Warning;
    }
}
