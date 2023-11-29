import { useState, useEffect } from 'react';
import useDonationCampaign from '../../Hooks/useDonationCampaign';
import DonationCampingCard from './DonationCampingCard';

const DonationCampaign = () => {
  const [donationCampaign, setDonationCampaign] = useDonationCampaign();

  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadMoreCampaigns = async () => {
      const newCampaigns = await fetchMoreCampaigns();
      setDonationCampaign([...donationCampaign, ...newCampaigns]);
    };

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        loadMoreCampaigns();
      }
    }, options);

    const lastCampaignCard = document.querySelector('.campaign-card:last-child');
    if (lastCampaignCard) {
      observer.observe(lastCampaignCard);
    }

    return () => {
      if (lastCampaignCard) {
        observer.unobserve(lastCampaignCard);
      }
    };
  }, [donationCampaign]);

  const fetchMoreCampaigns = async () => {
    const response = await fetch(`/api/campaigns?page=${page + 1}`);
    const newCampaigns = await response.json();

    setPage(page + 1);

    // Sort the combined array of existing and new campaigns by date
    const combinedCampaigns = [...donationCampaign, ...newCampaigns];
    const sortedCampaigns = combinedCampaigns.sort((a, b) => new Date(b.date) - new Date(a.date));

    return sortedCampaigns;
  };

  return (
    <div className="grid justify-center mt-9 md:grid-cols-2 md:ml-8 lg:grid-cols-3 gap-4 mb-3">
      {donationCampaign.map((item, index) => (
        <DonationCampingCard key={item._id} item={item} className={`campaign-card${index === donationCampaign.length - 1 ? ' last-child' : ''}`} />
      ))}
    </div>
  );
};

export default DonationCampaign;
