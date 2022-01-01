import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    TextInput
} from 'react-native';
import { HorizontalFoodCard, VerticalFoodCard } from '../../components';
import { FONTS, SIZES, icons, dummyData, COLORS } from '../../constants';

export interface MenuListInterface {
    id: number;
    name: string;
    description: string;
    categories: number[];
    price: number;
    calories: number;
    isFavourite: boolean;
    image: any;
};

const Section = ({ title, onPress, children }: { title: string, onPress: () => void, children: JSX.Element }) => {
    return (
        <View>
            {/* Header */}
            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal: SIZES.padding,
                    marginTop: 30,
                    marginBottom: 20
                }}
            >
                <Text style={{ flex: 1, ...FONTS.h3 }}>{title}</Text>

                <TouchableOpacity onPress={onPress}>
                    <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>Show All</Text>
                </TouchableOpacity>
            </View>

            {/* Conten */}
            {children}
        </View>
    )
}

const renderSearch = () => {
    return (
        <View
            style={{
                flexDirection: 'row',
                height: 40,
                alignItems: 'center',
                marginHorizontal: SIZES.padding,
                marginVertical: SIZES.base,
                paddingHorizontal: SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightGray2
            }}
        >
            {/* Icon */}
            <Image 
                source={icons.search}
                style={{ height: 20, width: 20, tintColor: COLORS.black }}
            />

            {/* TextInput */}
            <TextInput 
                style={{
                    flex: 1,
                    marginLeft: SIZES.radius,
                    ...FONTS.body3
                }}            
                placeholder='search food...'
            />

            {/* Filter button */}
            <TouchableOpacity>
                <Image 
                    source={icons.filter}
                    style={{ height: 20, width: 20, tintColor: COLORS.black }}
                />
            </TouchableOpacity>
        </View>
    )
}

const Home = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(1);
    const [selectedMenuType, setSelectedMenuType] = useState(1);
    const [menuList, setMenuList] = useState<MenuListInterface[] | undefined>([]);
    const [recommend, setRecommend] = useState<MenuListInterface[] | undefined>([]);
    const [popular, setPopular] = useState<MenuListInterface[] | undefined>([]);


    useEffect(() => {
        handleChangeCategory(selectedCategoryId, selectedMenuType)
    }, []);

    const handleChangeCategory = (categoryId: number, menuTypeId: number) => {
        // Retrieve the popular menu
        let selectedPopular = dummyData.menu.find(a => a.name === "Popular")

        // retrieve the recommended menu
        let selectedRecommend = dummyData.menu.find(a => a.name === "Recommended");

        // Find menu based on the MenutypeId
        let seledctedMenu = dummyData.menu.find((a) => a.id === menuTypeId);

        // Set the popular menu based on the categoryId
        setPopular(selectedPopular?.list.filter(a => a.categories.includes(categoryId)));

        // Set the recommended menu based on the categoryId
        setRecommend(selectedRecommend?.list.filter(a => a.categories.includes(categoryId)))

        // Set the menu based on the category id
        setMenuList(seledctedMenu?.list.filter(a => a.categories.includes(categoryId)));
    }

    const renderMenuTypes = () => {
        return (
            <FlatList 
                horizontal
                data={dummyData.menu}
                keyExtractor={item => `${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 30,
                    marginBottom: 20
                }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={{
                            marginLeft: SIZES.padding,
                            marginRight: index === dummyData.menu.length - 1 ? SIZES.padding : 0
                        }}
                        onPress={() => {
                            setSelectedMenuType(item.id);
                            handleChangeCategory(selectedCategoryId, item.id)
                        }}
                    >
                        <Text style={{ color:  selectedMenuType === item.id ? COLORS.primary : COLORS.black, ...FONTS.h3 }}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        )
    }

    const renderRecommendedSection = () => {
        if(!recommend) return <></>

        return (
            <Section title={'Recommended'} onPress={() => console.log('Show all recommende')}>
                <FlatList 
                    data={recommend}
                    keyExtractor={item => `${item.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <HorizontalFoodCard 
                            containerStyle={{
                                height: 180,
                                width: SIZES.width * 0.85,
                                marginLeft: index === 0 ? SIZES.padding : 18,
                                marginRight: index === recommend?.length - 1 ? SIZES.padding : 0,
                                paddingRight: SIZES.radius,
                                alignItems: 'center'
                            }} 
                            imageStyle={{
                                marginTop: 35,
                                height: 150,
                                width: 150
                            }}
                            item={item}
                            onPress={() => console.log('Horizontal food card')}
                        />
                    )}
                />
            </Section>
        )
    }

    const renderPopularSection = () => {
        if(!popular) return <></>

        return (
            <Section title='Popular Near You' onPress={() => console.log('show all opular items')}>
                <FlatList 
                    data={popular}
                    keyExtractor={item => `${item.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <VerticalFoodCard 
                            containerStyle={{
                                marginLeft: index === 0 ? SIZES.padding : 18,
                                marginRight: index === popular?.length - 1 ? SIZES.padding : 0,
                                padding: 18
                            }}
                            item={item}
                            onPress={() => console.log('Vertical Food Card')}
                        />
                    )}
                />
            </Section>
        )
    }

    const renderFoodCategories = () => {
        return (
            <FlatList 
                data={dummyData.categories}
                keyExtractor={item => `${item.id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            height: 55,
                            marginTop: SIZES.padding,
                            marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
                            marginRight: index === dummyData.categories.length - 1 ? SIZES.padding : 0,
                           paddingHorizontal: 8,
                           borderRadius: SIZES.radius,
                           backgroundColor: selectedCategoryId === item.id ? COLORS.primary : COLORS.lightGray2 
                        }}
                        onPress={() => {
                            setSelectedCategoryId(item.id);
                            handleChangeCategory(item.id, selectedMenuType)
                        }}
                    >
                        <Image 
                            source={item.icon}
                            style={{
                                marginTop: 5,
                                height: 50,
                                width: 50
                            }}
                        />   
                        <Text style={{ alignSelf: 'center', marginRight: SIZES.base, color: selectedCategoryId === item.id ? COLORS.white : COLORS.darkGray, ...FONTS.h3 }}>{item.name}</Text>    
                    </TouchableOpacity>
                )}
            />
        )
    }

    return (
        <View
            style={{ flex: 1 }}
        >
            {/* Search section */}
            {renderSearch()}

            {/* List section */}
            <FlatList 
                data={menuList}
                keyExtractor={(item) => `${item.id}`}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <HorizontalFoodCard 
                            containerStyle={{
                                height: 130,
                                alignItems: 'center',
                                marginHorizontal:  SIZES.padding,
                                marginBottom: SIZES.radius
                            }}
                            imageStyle={{
                                marginTop: 20,
                                height: 110,
                                width: 110
                            }}
                            item={item}
                            onPress={() => console.log('HorizontalFoodCard')}
                        />
                    )
                }}  
                ListHeaderComponent={
                    <View>
                        {/* Food Category */}
                        {renderFoodCategories()}

                        {/* Popular */}
                        {renderPopularSection()}

                        {/* Recommended */}
                        {renderRecommendedSection()}
                        
                        {/* Menu Type */}
                        {renderMenuTypes()}
                    </View>
                }
            />
        </View>
    )
}

export default Home;