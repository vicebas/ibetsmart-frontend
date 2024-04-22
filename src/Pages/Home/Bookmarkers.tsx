import React, {useState, useEffect} from 'react';
import { Bookmarker as BookmarkerType } from '../../interfaces';
import api from '../../Api';
import {Container, FormControl, FormLabel, Heading, Skeleton, Stack, Switch} from "@chakra-ui/react";

type BookmarkerProps = {
    bookmarker: BookmarkerType

}
const Bookmarker: React.FC<BookmarkerProps> = ({bookmarker}) => {
    const [isBookmarked, setBookmarked] = useState(bookmarker.active);

    const handleBookmarkerActivate =  (value: string) => {
        const checked = value === 'true';
        setBookmarked(checked)
        api.updateBookmarker(bookmarker.id.toString(), checked );

    }
    return(
    <FormControl display='flex' alignItems='center'>
        <FormLabel htmlFor='email-alerts' mb='0'>
            {bookmarker.name} - {bookmarker.website}
        </FormLabel>
        <Switch id='email-alerts' defaultChecked={isBookmarked} onChange={(evt) => handleBookmarkerActivate(evt.target.value)} />
    </FormControl>
    )
}


const Bookmarkers = () => {
    const [loading, setLoading] = useState(true);
    const [bookmarkers, setBookmarkers] = useState<BookmarkerType[]>([]);

    const fetchBookmarkers = async () => {
        const data = (await api.getBookmarkers()).data as BookmarkerType[];
        setBookmarkers(data);
        setLoading(false);
    }
    useEffect(() => {
        fetchBookmarkers();
    }, []);

    if(loading)
        return (
            <Stack>
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
            </Stack>
        )
    return (
        <Stack spacing={4}>
            {bookmarkers.map(bookmarker => <Bookmarker key={bookmarker.id} bookmarker={bookmarker} />)}
        </Stack>
    )

}

const BookmarkerPage = () => (

    <Container>
        <Stack spacing={4}>
            <Heading>My Bookmarkers</Heading>
            <Bookmarkers />
        </Stack>
    </Container>

    )

export default BookmarkerPage;
