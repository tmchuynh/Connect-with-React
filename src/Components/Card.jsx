import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { createStyles, Paper, Text, Title, Button, useMantineTheme, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    card: {
        height: rem(440),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        color: theme.white,
        lineHeight: 1.2,
        fontSize: rem(32),
        marginTop: theme.spacing.xs,
    },

    category: {
        color: theme.white,
        opacity: 0.7,
        fontWeight: 700,
        textTransform: 'uppercase',
    },

    description: {
        color: theme.white,
        opacity: 0.7,
        fontSize: rem(16),
        marginTop: theme.spacing.sm,
    },
}));


function Card({ image, title, category, description }) {
    const { classes } = useStyles();

    return (
        <Paper
            shadow="md"
            p="xl"
            radius="md"
            sx={{ backgroundImage: `url(${image})` }}
            className={classes.card}
        >
            <div>
                <Text className={classes.category} size="xs">
                    {category}
                </Text>
                <Title order={3} className={classes.title}>
                    {title}
                </Title>
                <Text className={classes.description} size="sm">
                    {description}
                </Text>
            </div>
        </Paper>
    );
}


const data = [
    {
        image:
            'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'Best forests to visit in North America',
        description:
            'Explore the most stunning forests in North America with this guide. From the redwoods of California to the birch forests of the northeast, discover the beauty and diversity of these natural wonders.',
        category: 'nature',
    },
    {
        image:
            'https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'Hawaii beaches review: better than you think',
        description:
            'Think you know everything about Hawaii? Think again! In this article, we review some of the most beautiful and unique beaches in the islands, and provide tips for making the most of your time there.',
        category: 'beach',
    },
    {
        image:
            'https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'Mountains at night: 12 best locations to enjoy the view',
        description:
            'If you love the outdoors, you won’t want to miss this guide to the best places to view mountains at night. From the Rockies to the Alps, we’ve got you covered.',
        category: 'nature',
    },
    {
        image:
            'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'Aurora in Norway: when to visit for best experience',
        description:
            'Witnessing the Aurora in Norway is a truly magical experience, but timing is everything. In this article, we provide all the information you need to plan your trip, from the best time to go to the best places to stay.',
        category: 'nature',
    },
];

export function CardsCarousel() {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    const slides = data.map((item) => (
        <Carousel.Slide key={item.title}>
            <Card {...item} />
        </Carousel.Slide>
    ));

    return (
        <Carousel
            slideSize="25%"
            breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: rem(2) }]}
            slideGap="xl"
            align="start"
            slidesToScroll={mobile ? 1 : 2}
        >
            {slides}
        </Carousel>
    );
}