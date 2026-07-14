import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

import { useArticle } from "../../providers/ArticleProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState();
  const navigate = useNavigate("");
  const {
    articles,
    setArticles,
    handleGetAllArticles,
    totalArticles,
    setTotalArticles,
    handleGetFilteredArticles,
  } = useArticle([]);
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    navigate("/");

    if (value.trim()) {
      handleGetFilteredArticles(value, 1);
    } else {
      handleGetAllArticles(1);
    }
  };

  const handleClearSearch = () => {
    handleGetAllArticles(1);
  };
  return (
    <TextField
      value={search}
      onChange={handleSearchChange}
      placeholder="Search articles..."
      size="small"
      sx={{
        width: {
          xs: 180,
          sm: 280,
          md: 360,
        },

        "& .MuiOutlinedInput-root": {
          height: 42,
          borderRadius: 50,
          bgcolor: "background.paper",
          transition: "0.2s",

          "& fieldset": {
            borderColor: "divider",
          },

          "&:hover fieldset": {
            borderColor: "primary.main",
          },

          "&.Mui-focused fieldset": {
            borderWidth: 1,
          },
        },

        "& input": {
          fontSize: "0.95rem",
          py: 0,
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                sx={{
                  color: "text.secondary",
                  fontSize: 21,
                }}
              />
            </InputAdornment>
          ),

          endAdornment: search ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                aria-label="Clear search"
                onClick={handleClearSearch}
                edge="end"
              >
                <CloseIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </InputAdornment>
          ) : null,
        },
      }}
    />
  );
}
