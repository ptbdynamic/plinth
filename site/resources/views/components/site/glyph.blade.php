{{-- The site's icons: 24 × 24 strokes in currentColor, for <x-plinth::icon> and icon buttons. --}}
@props(['name'])
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    @switch($name)
        @case('arrow-right')
            <path d="M5 12h14M13 6l6 6-6 6"></path>
            @break
        @case('arrow-left')
            <path d="M19 12H5M11 6l-6 6 6 6"></path>
            @break
        @case('github')
            <circle cx="6" cy="5" r="2"></circle><circle cx="6" cy="19" r="2"></circle><circle cx="18" cy="7" r="2"></circle><path d="M6 7v10"></path><path d="M18 9c0 4-4 5-8 6l-2 .6"></path>
            @break
        @case('menu')
            <path d="M4 7h16M4 12h16M4 17h16"></path>
            @break
        @case('layers')
            <path d="M12 3l9 5-9 5-9-5z"></path><path d="M3 13l9 5 9-5"></path>
            @break
        @case('code')
            <path d="M16 18l6-6-6-6M8 6l-6 6 6 6"></path>
            @break
        @case('check')
            <path d="M5 12l5 5L19 7"></path>
            @break
        @case('lines')
            <path d="M4 7h16M4 12h10M4 17h7"></path>
            @break
        @case('window')
            <rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="M3 9h18"></path>
            @break
        @case('search')
            <circle cx="11" cy="11" r="6.5"></circle><path d="M16 16l4 4"></path>
            @break
        @case('alert')
            <circle cx="12" cy="12" r="9"></circle><path d="M12 7v6M12 16.5v.01"></path>
            @break
        @case('close')
            <path d="M6 6l12 12M18 6L6 18"></path>
            @break
        @case('plus')
            <path d="M12 5v14M5 12h14"></path>
            @break
        @case('more')
            <circle cx="5" cy="12" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle>
            @break
        @case('user')
            <circle cx="12" cy="8" r="4"></circle><path d="M4 20a8 8 0 0 1 16 0"></path>
            @break
        @case('copy')
            <rect x="8" y="8" width="12" height="12" rx="2"></rect><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"></path>
            @break
        @case('inbox')
            <path d="M4 13l2.5-8h11L20 13v6H4z"></path><path d="M4 13h4.5a3.5 3.5 0 0 0 7 0H20"></path>
            @break
        @case('archive')
            <rect x="3" y="4" width="18" height="4" rx="1"></rect><path d="M5 8v11h14V8M10 12h4"></path>
            @break
        @case('trash')
            <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"></path>
            @break
        @case('bell')
            <path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4z"></path><path d="M10 21h4"></path>
            @break
        @case('download')
            <path d="M12 3v12M7 10l5 5 5-5M5 21h14"></path>
            @break
        @case('image')
            <rect x="3" y="5" width="18" height="14" rx="2"></rect><circle cx="9" cy="10" r="1.5"></circle><path d="M21 16l-5-5-8 8"></path>
            @break
        @case('support')
            <circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="4"></circle><path d="M5.6 5.6l3.6 3.6M14.8 14.8l3.6 3.6M18.4 5.6l-3.6 3.6M9.2 14.8l-3.6 3.6"></path>
            @break
        @case('sliders')
            <path d="M4 7h10M18 7h2M4 17h4M12 17h8"></path><circle cx="16" cy="7" r="2"></circle><circle cx="10" cy="17" r="2"></circle>
            @break
        @case('help')
            <circle cx="12" cy="12" r="9"></circle><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 17v.01"></path>
            @break
        @case('panel')
            <rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="M9 4v16"></path>
            @break
        @case('harbour')
            <rect x="3" y="3" width="18" height="18" rx="5"></rect><path d="M7 11c1.7 0 1.7-1.5 3.3-1.5s1.7 1.5 3.4 1.5 1.6-1.5 3.3-1.5M7 15c1.7 0 1.7-1.5 3.3-1.5s1.7 1.5 3.4 1.5 1.6-1.5 3.3-1.5"></path>
            @break
    @endswitch
</svg>
