import React, { useState } from 'react';
import { useMobileNative } from './MobileNativeContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const SearchBar = () => {
  const { tokens } = useMobileNative();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={`${tokens.layout.mobileMaxWidth} mx-auto px-4 pt-3 pb-2`}>
      <div
        className={`flex items-center gap-2 px-3 py-2 bg-white border ${tokens.layout.borderRadius.card}`}
        style={{
          borderColor: tokens.colors.border,
          boxShadow: tokens.effects.shadow.card
        }}
      >
        <SafeIcon
          icon={FiIcons.FiSearch}
          className="text-[16px]"
          style={{ color: tokens.colors.sectionNormalText }}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search menu..."
          className="flex-1 text-[15px] bg-transparent outline-none"
          style={{ color: tokens.colors.primaryText }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="p-1 active:scale-90 transition-transform"
            style={{ color: tokens.colors.sectionNormalText }}
          >
            <SafeIcon icon={FiIcons.FiX} className="text-[16px]" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
