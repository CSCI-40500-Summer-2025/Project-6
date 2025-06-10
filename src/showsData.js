const showsData = [
    {
        title: "Stranger Things",
        streamingService: "Netflix"
    },
    {
        title: "The Mandalorian",
        streamingService: "Disney+"
    },
    {
        title: "The Boys",
        streamingService: "Prime Video"
    },
    {
        title: "Succession",
        streamingService: "HBO Max"
    },
    {
        title: "Ted Lasso",
        streamingService: "Apple TV+"
    },
    {
        title: "The Crown",
        streamingService: "Netflix"
    },
    {
        title: "The Last of Us",
        streamingService: "HBO Max"
    },
    {
        title: "Severance",
        streamingService: "Apple TV+"
    },
    {
        title: "The Bear",
        streamingService: "Hulu"
    },
    {
        title: "Wednesday",
        streamingService: "Netflix"
    }
];

// Function to find the most relevant streaming service based on show title
const findStreamingService = (showTitle) => {
    const show = showsData.find(show => 
        show.title.toLowerCase() === showTitle.toLowerCase()
    );
    
    if (show) {
        return {
            streamingService: show.streamingService,
            show: show
        };
    }
    
    return null;
};

// Function to get all shows for a specific streaming service
const getShowsByStreamingService = (streamingService) => {
    return showsData.filter(show => 
        show.streamingService.toLowerCase() === streamingService.toLowerCase()
    );
};

// Function to recommend streaming service based on multiple shows
const recommendStreamingService = (showTitles) => {
    // Find all matching shows
    const matchingShows = showTitles
        .map(title => findStreamingService(title))
        .filter(result => result !== null);

    if (matchingShows.length === 0) {
        return {
            recommendation: null,
            reasoning: "No matching shows found in our database."
        };
    }

    // Count occurrences of each streaming service
    const serviceCounts = matchingShows.reduce((acc, { streamingService }) => {
        acc[streamingService] = (acc[streamingService] || 0) + 1;
        return acc;
    }, {});

    // Find the most common streaming service
    const mostCommonService = Object.entries(serviceCounts)
        .sort((a, b) => b[1] - a[1])[0];

    return {
        recommendation: {
            streamingService: mostCommonService[0],
            matchCount: mostCommonService[1],
            totalShows: matchingShows.length
        },
        reasoning: `Based on your ${matchingShows.length} show(s), ${mostCommonService[0]} is the best match with ${mostCommonService[1]} of your shows available.`
    };
};

export { showsData, findStreamingService, getShowsByStreamingService, recommendStreamingService }; 