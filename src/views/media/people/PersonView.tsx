import { LinkGroup } from '@/components';
import { getImageUrl, PERSON_ENDPOINT, type PersonResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { FaBirthdayCake } from 'react-icons/fa';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const PersonView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useTmdb<PersonResponse>(`${PERSON_ENDPOINT}/${id}`, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-7xl mx-auto p-5 space-y-8">
      <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white text-sm flex items-center gap-2">
        ← Back
      </button>
      <div className="flex gap-6">
        <img className="w-40 rounded-xl object-cover" src={getImageUrl(data.profile_path)} alt={data.name} />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <div className="flex row gap-2">
            <FaBirthdayCake />
            <p className="text-gray-400 text-sm">{data.birthday}</p>
          </div>
          <p className="text-gray-300 leading-relaxed">{data.biography}</p>
        </div>
      </div>
      <div className="space-y-4">
        <LinkGroup
          options={[
            { label: 'Career', to: 'career' },
            { label: 'Images', to: 'images' },
          ]}
        />
        <Outlet />
      </div>
    </section>
  );
};
