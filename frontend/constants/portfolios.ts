import { LocalizedText } from "@/lib/content-helpers";

export type ContentBlock =
    | { type: 'hero'; media: string; mediaType: 'video' | 'image'; title?: string | LocalizedText; subtitle?: string | LocalizedText; align?: 'left' | 'center' }
    | { type: 'text-highlight'; text: string | LocalizedText; label?: string | LocalizedText; align?: 'left' | 'center' }
    | { type: 'info-card'; media: string; mediaType: 'video' | 'image'; title?: string | LocalizedText; details?: { label: string | LocalizedText; value: string | LocalizedText }[]; theme?: 'paper' | 'dark' | 'glass'; align?: 'left' | 'right' }
    | { type: 'reel-grid'; mobileLayout?: 'swipe' | 'column'; items: { media: string; mediaType: 'video' | 'image'; caption?: string | LocalizedText }[] }
    | { type: 'media-grid'; items: { media: string; mediaType: 'video' | 'image'; size?: 'sq' | 'wide' }[] }
    | { type: 'vertical-showcase'; media: string; mediaType: 'video' | 'image'; overlayText?: string | LocalizedText; title?: string | LocalizedText }
    | { type: 'results'; title: string | LocalizedText; description: string | LocalizedText; stats: { label: string | LocalizedText; value: string | LocalizedText }[] }
    | {
        type: 'legacy-columns';
        left: { title: string | LocalizedText; text: string | LocalizedText; label?: string | LocalizedText };
        right: { title: string | LocalizedText; text: string | LocalizedText; label?: string | LocalizedText };
    };

export interface Project {
    id: string;
    slug: string;
    category: string;
    categorySlug: string;
    client: string;
    title: string;
    description: string;
    strategy?: string; // Made optional
    execution?: string;
    results?: string; // Made optional
    resultNumbers?: Array<{ label: string; value: string }>;
    images?: string[];
    coverImage?: string;
    content?: ContentBlock[]; // New flexible content array
}

export const projects: Project[] = [
    {
        id: "showcase",
        slug: "all-blocks-showcase",
        category: "Portfolio",
        categorySlug: "showcase",
        client: "Team Creative",
        title: "All Blocks Showcase",
        description: "A demonstration of all available portfolio content blocks.",
        coverImage: "/images/saxenosno/sacxenosno1.png",
        content: [
            {
                type: 'hero',
                media: "/images/saxenosno/sacxenosno1.png",
                mediaType: 'image',
                title: { en: "The Showcase", ge: "ჩვენება" },
                subtitle: { en: "All Components", ge: "ყველა კომპონენტი" }
            },
            {
                type: 'text-highlight',
                label: { en: "Introduction", ge: "შესავალი" },
                text: { en: "This page demonstrates every content block available in the system.", ge: "ეს გვერდი აჩვენებს სისტემაში არსებულ ყველა კონტენტის ბლოკს." },
                align: 'center'
            },
            {
                type: 'legacy-columns',
                left: {
                    label: { en: "The Task", ge: "დაველება" },
                    title: { en: "Challenge", ge: "გამოწვევა" },
                    text: { en: "To create a flexible system that handles various media types and layouts.", ge: "მოქნილი სისტემის შექმნა, რომელიც უმკლავდება სხვადასხვა მედია ტიპებს და განლაგებას." }
                },
                right: {
                    label: { en: "The Strategy", ge: "სტრატეგია" },
                    title: { en: "Modular Design", ge: "მოდულური დიზაინი" },
                    text: { en: "We implemented a block-based architecture allowing for infinite combinations.", ge: "ჩვენ დავნერგეთ ბლოკებზე დაფუძნებული არქიტექტურა, რომელიც იძლევა უსასრულო კომბინაციების საშუალებას." }
                }
            },
            {
                type: 'info-card',
                media: "/images/saxenosno/sacxenosno2.png",
                mediaType: 'image',
                title: { en: "Info Card", ge: "ინფო ბარათი" },
                align: 'left',
                theme: 'paper',
                details: [
                    { label: { en: "Type", ge: "ტიპი" }, value: { en: "Showcase", ge: "ჩვენება" } },
                    { label: { en: "Status", ge: "სტატუსი" }, value: { en: "Active", ge: "აქტიური" } }
                ]
            },
            {
                type: 'media-grid',
                items: [
                    { media: "/images/saxenosno/sacxenosno6.png", mediaType: 'image', size: 'sq' },
                    { media: "/images/saxenosno/sacxenosno7.png", mediaType: 'image', size: 'sq' }
                ]
            },
            {
                type: 'reel-grid',
                mobileLayout: 'swipe',
                items: [
                    { media: "/images/saxenosno/sacxenosno3.png", mediaType: 'image', caption: { en: "Reel 1", ge: "რილ 1" } },
                    { media: "/images/saxenosno/sacxenosno4.png", mediaType: 'image', caption: { en: "Reel 2", ge: "რილ 2" } },
                    { media: "/images/saxenosno/sacxenosno5.png", mediaType: 'image', caption: { en: "Reel 3", ge: "რილ 3" } }
                ]
            },
            {
                type: 'vertical-showcase',
                media: "/images/saxenosno/sacxenosno8.png",
                mediaType: 'image',
                title: { en: "Vertical", ge: "ვერტიკალური" },
                overlayText: { en: "Showcase Block", ge: "ჩვენების ბლოკი" }
            },
            {
                type: 'results',
                title: { en: "Great Success", ge: "დიდი წარმატება" },
                description: { en: "The blocks are working perfectly.", ge: "ბლოკები იდეალურად მუშაობს." },
                stats: [
                    { label: { en: "Blocks", ge: "ბლოკები" }, value: { en: "8+", ge: "8+" } },
                    { label: { en: "Errors", ge: "შეცდომები" }, value: "0" }
                ]
            }
        ],
    },
    {
        id: "hauck",
        slug: "hauck-localization",
        category: "Social Media",
        categorySlug: "social-media",
        client: "Hauck",
        title: "German Brand Localization",
        description: "ამოცანა: მსოფლიოში აღიარებული გერმანული ბრენდის Hauck-ის ლოკალიზაცია და ონლაინ კომერციის გაძლიერება.",
        content: [
            {
                type: 'hero',
                media: "https://images.unsplash.com/photo-1519689689353-897079b21269?q=80&w=1200&auto=format&fit=crop",
                mediaType: 'image',
                title: "German Quality, Georgian Comfort",
                subtitle: "Hauck / Social Media Strategy"
            },
            {
                type: 'text-highlight',
                label: "The Challenge",
                text: "The main challenge was shifting Georgian consumer behavior: encouraging the purchase of premium baby gear online instead of in physical stores.",
                align: 'center'
            },
            {
                type: 'info-card',
                media: "https://images.unsplash.com/photo-1515488042-27a410625bed?q=80&w=1200&auto=format&fit=crop",
                mediaType: 'image',
                title: "Safety & Trust",
                align: 'left',
                theme: 'paper',
                details: [
                    { label: "Target Audience", value: "New Parents" },
                    { label: "Key Message", value: "Safety First" },
                    { label: "Platform", value: "Facebook & Instagram" }
                ]
            },
            {
                type: 'text-highlight',
                label: "The Strategy",
                text: "We built our strategy on 'German Quality' and 'Safety' as core trust factors. We turned social media into a 'Safe Zone', using creative campaigns and functional demonstrations to remove the barrier to online purchasing.",
                align: 'center'
            },
            {
                type: 'reel-grid',
                items: [
                    { media: "https://images.unsplash.com/photo-1544126592-807daa2b569f?q=80&w=1200&auto=format&fit=crop", mediaType: 'image', caption: "FUNCTIONAL DEMOS" },
                    { media: "https://images.unsplash.com/photo-1519689689353-897079b21269?q=80&w=1200", mediaType: 'image', caption: "LIFESTYLE INTEGRATION" },
                    { media: "https://images.unsplash.com/photo-1515488042-27a410625bed?q=80&w=1200", mediaType: 'image', caption: "CUSTOMER STORIES" }
                ]
            },
            {
                type: 'results',
                title: "DIGITAL GROWTH",
                description: "Our emotional and rational content strategy successfully shifted consumer behavior, driving significant traffic to the website and increasing conversion rates.",
                stats: [
                    { label: "Engagement Increase", value: "150%" },
                    { label: "Online Sales Growth", value: "45%" }
                ]
            }
        ],
        // Legacy fields for fallback/safety
        strategy: "სტრატეგია: სტრატეგია ავაგეთ „გერმანული ხარისხისა“ და „უსაფრთხოების“ ნდობის ფაქტორზე. სოციალური მედია ვაქციეთ უსაფრთხო ზონად...",
        results: "შედეგები ციფრებში: (მონაცემები დასამატებელია)",
        coverImage: "https://images.unsplash.com/photo-1519689689353-897079b21269?q=80&w=1200&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1519689689353-897079b21269?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1515488042-27a410625bed?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1544126592-807daa2b569f?q=80&w=1200&auto=format&fit=crop"
        ],
    },
    {
        id: "horse-riding",
        slug: "horse-riding-tourism",
        category: "Social Media",
        categorySlug: "social-media",
        client: "Horse Riding Tourism",
        title: "Equestrian Tourism in Georgia",
        description: "ამოცანა: საქართველოს პოზიციონირება, როგორც საცხენოსნო ტურიზმის გამორჩეული მიმართულება. ამოცანა იყო არა უბრალოდ ტურის გაყიდვა, არამედ საერთაშორისო და ადგილობრივი აუდიტორიისთვის იმის ჩვენება, რომ საქართველოში მოგზაურობა ცხენით შესაძლებელია იყოს ცხოვრებისეული გამოცდილება.",
        content: [
            {
                type: 'hero',
                media: "/images/saxenosno/sacxenosno1.png",
                mediaType: 'image',
                title: {
                    en: "Discover the Wild",
                    ge: "აღმოაჩინე ველური ბუნება"
                },
                subtitle: {
                    en: "Horse Riding Tourism / Strategy",
                    ge: "საცხენოსნო ტურიზმი / სტრატეგია"
                }
            },
            {
                type: 'text-highlight',
                label: {
                    en: "The Challenge",
                    ge: "გამოწვევა"
                },
                text: {
                    en: "The main goal was to position Georgia as a premier destination for equestrian tourism. We needed to sell not just a tour, but a life-changing experience, showing both international and local audiences the magic of exploring Georgia on horseback.",
                    ge: "მთავარი მიზანი იყო საქართველოს პოზიციონირება, როგორც საცხენოსნო ტურიზმის გამორჩეული მიმართულება. ჩვენ უნდა გაგვეყიდა არა უბრალოდ ტური, არამედ ცხოვრებისეული გამოცდილება, გვეჩვენებინა როგორც საერთაშორისო, ისე ადგილობრივი აუდიტორიისთვის საქართველოს ცხენით მოგზაურობის მაგია."
                },
                align: 'center'
            },
            {
                type: 'info-card',
                media: "/images/saxenosno/sacxenosno2.png",
                mediaType: 'image',
                title: {
                    en: "Nature & Adrenaline",
                    ge: "ბუნება და ადრენალინი"
                },
                align: 'right',
                theme: 'paper',
                details: [
                    { label: { en: "Location", ge: "ლოკაცია" }, value: { en: "Georgia", ge: "საქართველო" } },
                    { label: { en: "Focus", ge: "ფოკუსი" }, value: { en: "Equestrian Tourism", ge: "საცხენოსნო ტურიზმი" } },
                    { label: { en: "Key Element", ge: "მთავარი ელემენტი" }, value: { en: "Experience", ge: "გამოცდილება" } }
                ]
            },
            {
                type: 'text-highlight',
                label: {
                    en: "The Strategy",
                    ge: "სტრატეგია"
                },
                text: {
                    en: "Our strategy focused on behavioral change: showing the space where these experiences happen. In tourism, people buy dreams. So we created content that let viewers feel the wind, hear nature, and sense the adrenaline right through their screens.",
                    ge: "ჩვენი სტრატეგიის მთავარი მამოძრავებელი ძალა ქცევის ცვლილებაზე მუშაობა და მომხმარებლისთვის იმ სივრცის ჩვენება გახდა, სადაც ეს ყოველივე იყრის თავს. ტურიზმში მომხმარებელი ყიდულობს ოცნებას. ამიტომ, ჩვენ შევქმენით კონტენტი, რომელიც მაყურებელს აგრძნობინებდა ქარს, ბუნების ხმასა და ადრენალინს ეკრანიდანვე."
                },
                align: 'center'
            },
            {
                type: 'reel-grid',
                items: [
                    { media: "/images/saxenosno/sacxenosno3.png", mediaType: 'image', caption: { en: "WILD LANDSCAPES", ge: "ველური პეიზაჟები" } },
                    { media: "/images/saxenosno/sacxenosno4.png", mediaType: 'image', caption: { en: "FULL GALOP", ge: "ჭენება" } },
                    { media: "/images/saxenosno/sacxenosno5.png", mediaType: 'image', caption: { en: "TRUE CONNECTION", ge: "ნამდვილი კავშირი" } }
                ]
            },

        ],
        // Legacy/Fallback
        strategy: "სტრატეგია: ჩვენი სტრატეგიის მთავარი მამოძრავებელი ძალა ქცევის ცვლილებაზე მუშაობა და მომხმარებლისთვის იმ სივრცის ჩვენება გახდა, სადაც ეს ყოველივე იყრის თავს. ტურიზმში მომხმარებელი ყიდულობს ოცნებას. ამიტომ, ჩვენ შევქმენით კონტენტი, რომელიც მაყურებელს აგრძნობინებდა ქარს, ბუნების ხმასა და ადრენალინს ეკრანიდანვე.",
        results: "შედეგები ციფრებში: (მონაცემები დასამატებელია)",
        coverImage: "/images/saxenosno/sacxenosno1.png",
        images: [
            "/images/saxenosno/sacxenosno1.png",
            "/images/saxenosno/sacxenosno2.png",
            "/images/saxenosno/sacxenosno3.png",
            "/images/saxenosno/sacxenosno4.png",
            "/images/saxenosno/sacxenosno5.png"
        ],
    },
    {
        id: "wine",
        slug: "wine-promotion",
        category: "Social Media",
        categorySlug: "social-media",
        client: "Premium Wine Brand",
        title: "Premium Wine Positioning",
        description: "ამოცანა: მაღალი საფასო სეგმენტის ღვინის პოზიციონირება გაჯერებულ ბაზარზე. მთავარი გამოწვევა იყო არა უბრალოდ პროდუქტის ჩვენება, არამედ მისი „აღქმადი ღირებულების“ გაზრდა.",
        strategy: "სტრატეგია: სტრატეგია დავაფუძნეთ „პრემიუმალიზაციის“ პრინციპზე. ჩვენ არ ვყიდდით სითხეს, ჩვენ ვყიდდით სტატუსს და გასტრონომიულ კულტურას. შინაარსობრივ ნაწილში აქცენტი გაკეთდა ციფრული სომელიეს მიდგომაზე.",
        results: "შედეგები ციფრებში: (მონაცემები დასამატებელია)",
        coverImage: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?q=80&w=1200&auto=format&fit=crop"
        ],
    },
    {
        id: "construction",
        slug: "construction-sales",
        category: "Social Media",
        categorySlug: "social-media",
        client: "Construction Company",
        title: "Construction Sales Stimulation",
        description: "ამოცანა: კონკურენტულ სამშენებლო ბაზარზე ჩვენი მიზანი იყო ბინების რეალიზაციის სტიმულირება. მიზანი იყო მაღალი ხარისხის ლიდების გენერირება.",
        strategy: "სტრატეგია: ავირჩიეთ „Performance Marketing“-ის მიდგომა. ჩვენი სამიზნე იყო არა „ყველა“, არამედ კონკრეტულად ის სეგმენტი, ვისაც ბინის შეძენის ფინანსური მზაობა ჰქონდა.",
        results: "შედეგები ციფრებში: (მონაცემები დასამატებელია)",
        coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1503387762-592dea58ef21?q=80&w=1200&auto=format&fit=crop"
        ],
    },
    {
        id: "development",
        slug: "development-branding",
        category: "Social Media",
        categorySlug: "social-media",
        client: "Development Company",
        title: "Development Brand Awareness",
        description: "ამოცანა: სარემონტო ბაზარზე არსებული მაღალი კონკურენციის პირობებში, დეველოპერული კომპანიის პოზიციონირება სანდო და ხარისხიან პარტნიორად.",
        strategy: "სტრატეგია: სარემონტო სფეროში ნდობა არის ყვლაზე მნიშვნელოვანი ფაქტორი. ჩვენ ვაჩვენეთ, რომ სერვისი შეიძლება იყოს კომფორტული ხოლო პროექტის ჩაბარება მოხდეს დათქმულ ვადებში.",
        results: "შედეგები ციფრებში: (მონაცემები დასამატებელია)",
        coverImage: "https://images.unsplash.com/photo-1503387762-592dea58ef21?q=80&w=1200&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1503387762-592dea58ef21?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=1200&auto=format&fit=crop"
        ],
    },

];



export const getProject = (categorySlug: string, slug: string) => {

    return projects.find(p => p.categorySlug === categorySlug && p.slug === slug);

};



export const getProjectsByCategory = (categorySlug: string) => {

    return projects.filter(p => p.categorySlug === categorySlug);

};