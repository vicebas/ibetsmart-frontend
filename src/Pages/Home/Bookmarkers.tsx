import React, {useState, useEffect} from 'react';
import { Bookmarker as BookmarkerType } from '../../interfaces';
import api from '../../Api';
import {Col, Row, Switch, Flex, List, Card} from "antd";
import Loading from "../../Components/Loading.tsx";
import { Typography } from 'antd';
const { Title } = Typography;

type BookmarkerProps = {
    bookmarker: BookmarkerType

}
const Bookmarker: React.FC<BookmarkerProps> = ({bookmarker}) => {
    const [isBookmarked, setBookmarked] = useState(bookmarker.active);
    const [loading, setLoading] = useState(false);
    const handleBookmarkerActivate =  (checked: boolean) => {
        setLoading(true)
        api.updateBookmarker(bookmarker.id.toString(), checked )
            .then(() =>{
                setLoading(false)
                setBookmarked(checked)
            })
            .catch(() => setLoading(false))    ;

    }
    return(
        <List.Item

            extra={[<Switch defaultChecked={isBookmarked} loading={loading} onChange={(checked) => handleBookmarkerActivate(checked)} />]}
            >
                  <List.Item.Meta
            title={bookmarker.name} 
            description={bookmarker.website}
        />
                </List.Item>)
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
            <Loading />
        )
     return (
        <Card>
        <List  size="small" 
        >
            {bookmarkers.sort((a,b) => {
                if(a.active && !b.active)
                    return -1;
                if(!a.active && b.active)
                    return 1;
                
                return  a.name.localeCompare(b.name)
            }).map(bookmarker => 
            <Bookmarker key={bookmarker.id} bookmarker={bookmarker} />)}
        </List>
        </Card>
    )

}

const BookmarkerPage = () => (

    <Flex vertical style={{width:"100vw", padding:"0px 40px"}}>
            <Title>My Bookmarkers</Title>
                    <Bookmarkers />
    </Flex>

    )

export default BookmarkerPage;
