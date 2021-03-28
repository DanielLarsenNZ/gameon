import common_en from './en/common.json';
import common_de from './de/common.json';
import common_mi from './mi/common.json';
import tournament_en from './en/tournament.json';
import faq_en from './en/faq.json';

const languages = {
  en: {
    common: common_en,
    tournament: tournament_en,
    faq: faq_en,
  },
  de: {
    common: common_de,
  },
  mi: {
    common: common_mi,
  },
};

export default languages;
