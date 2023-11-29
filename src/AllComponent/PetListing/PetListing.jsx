import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import usePetListing from '../../Hooks/usePetListing';
import PetCard from '../PetCard/PetCard';
import PetTab from '../PetTab/PetTab';
const PetListing = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [petList, loading] = usePetListing();
    const dogs = petList.filter(item => item.type === 'dog');
    const cats = petList.filter(item => item.type === 'cat');
    const rabbits = petList.filter(item => item.type === 'rabbit');
    const fishs = petList.filter(item => item.type === 'fish');

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [page, setPage] = useState(1);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
      };
    
      const handleScroll = () => {
        if (
          window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight
        ) {
          // User has scrolled to the bottom
          setPage((prevPage) => prevPage + 1);
        }
      };

      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    return (
        <div className='mt-10 border-3'>
            <div className='flex justify-center items-center mb-5'>
                <div className='z-20'>
                    <label htmlFor="search">Search By Name: </label>
                    <input onChange={handleSearch} id="search" value={searchTerm} type="text" placeholder="Search" className="input input-xs input-bordered w-24 md:w-auto" />
                </div>

            
                <div className='ml-4 border bottom-3 z-20'>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value="all">All</option>
                        <option value="dog">Dogs</option>
                        <option value="cat">Cats</option>
                        <option value="rabbit">Rabbits</option>
                        <option value="fish">Fish</option>
                    </select>
                </div>
            </div>
            

            <PetTab  items={petList} searchTerm={searchTerm} selectedCategory={selectedCategory} page={page}></PetTab>
            {loading && <p>Loading...</p>}
            

           {/* <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>Dogs</Tab>
                    <Tab>CAts</Tab>
                    <Tab>Fish</Tab>
                    <Tab>Rabbit</Tab>
                </TabList>

                <TabPanel>
                    <PetTab items={dogs}></PetTab>
                </TabPanel>

                <TabPanel>  
                    <PetTab items={cats}></PetTab>
                </TabPanel>

                <TabPanel>
                    <PetTab items={rabbits}></PetTab>
                </TabPanel>

                <TabPanel> 
                    <PetTab items={fishs}></PetTab>
                </TabPanel>
            </Tabs>  */}
        </div>
    );
};

export default PetListing;